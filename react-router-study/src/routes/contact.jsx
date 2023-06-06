import {Form, useFetcher, useLoaderData} from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { contact };
}
export default function Contact() {
    const { contact } = useLoaderData();

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    {/*注意“destroy edit”的动作点。与<Link to>一样，<Form action>也可以采用相对值。
                    由于表单是在contact/:contactId中呈现的，因此当单击时，带有destroy的相对操作将把表单提交给contact/:contactId/destroy */}
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    {/*
                    1.<Form>阻止向服务器发送新的POST请求的默认浏览器行为，而是通过使用客户端路由创建POST请求来模拟浏览器
                    2.<Form action="destroy">匹配在"contacts/:contactId/destroy"处的新路由，并向它发送请求
                    3.动作重定向后，React Router调用页面上所有数据的加载器来获取最新的值(这是“重新验证”)。useLoaderData返回新值并导致组件更新!
                    */}
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function Favorite({ contact }) {
    const fetcher = useFetcher();
    let favorite = contact.favorite;
    //当使用真是的contact数据时，因为我们设置的fakeNetwork网络延时，会感觉星号收藏略微缓慢
    //此时我们使用fetcher的formData数据，有任何提交，我们直接渲染，不会有延时
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }

    return (
        // 希望在不改版路由的情况下(即历史里面没有记录)，改变数据。
        //useFetcher可以在不改变路由的情况下和loader和action进行通信。
        //和普通的Form最大的不同就是：URL不改变，即网页历史里面没有
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}