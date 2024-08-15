import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";
import { DashBoard } from "@/components/svg";
import { MenuItemProps } from "@/config/menus";
import { getUrl } from "@/hooks/utility";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  try {
    const response = await axios
      .post(
        getUrl(`v1/uac/auth/signIn`),
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(async (R) => {
        if (R.data.token) {
          const dynamicMenu: MenuItemProps[] = await axios
            .get(getUrl(`v1/uac/menu/getUsersMenu`), {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${R.data.token}`,
              },
            })
            .then((Res) => {
              console.log(Res.data);
              return Res.data
                ?.map((item: any) => {
                  const content = Res.data
                    .filter((data: any) => data.parentId === item.id)
                    .map((el: any) => ({
                      title: el.name,
                      id: item.id,
                      icon: DashBoard,
                      href: `/${el.path}`,
                      orderNode: el.orderNode,
                    }))
                    .sort((a: any, b: any) => a.orderNode - b.orderNode);

                  return {
                    title: item.name,
                    icon: DashBoard,
                    orderNode: item.orderNode,
                    href: `/${item.path}`,
                    child: content.length === 0 ? undefined : content,
                  };
                })
                .filter((item: any) => item.child !== undefined)
                .sort((a: any, b: any) => a.orderNode - b.orderNode);
            });
          console.log(dynamicMenu);
          return {
            token: R.data.token,
            dynamicMenu,
          };
        } else {
          return R.data.token;
        }
      });
    const token = response.token;

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.status(200).json({ menu: response.dynamicMenu, token });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
