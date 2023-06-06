import {Form, Outlet, useLoaderData, redirect, NavLink, useNavigation, useSubmit} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import {useEffect} from "react";

//增加人员时重定向到编辑页
export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

// 因为这是一个GET，而不是POST，所以React Router不会调用这个动作。
// 提交GET表单与单击链接相同:只是URL发生了变化。
// 这就是为什么会进入的代码是在loader中，而不是在的action中。
export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts,q };
}
export default function Root() {
    // 在web语义中，POST通常意味着一些数据正在改变。按照惯例，React Router会将此作为提示，
    // 在操作完成后自动重新验证页面上的数据。这意味着你所有的useLoaderData钩子都会更新，UI会自动与你的数据保持同步!
    const { contacts,q} = useLoaderData();
    const navigation = useNavigation();
    //引入其在输入框onchange时进行使用，submit函数将序列化并提交您传递给它的任何表单。
    const submit = useSubmit();
    //navigation.location会在应用导航到新URL并为其加载数据时显示。当没有待处理的导航时，它就会消失。
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );
    //引入useEffect来直接在DOM中操作表单的状态，解决efaultValue的第二点坏处
    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    {/*<form id="search-form" role="search">*/}
                    {/*    /!*注意，这个表单与我们使用过的其他表单不同，它没有<form method="post">。默认方法为“get”。*/}
                    {/*    这意味着当浏览器为下一个文档创建请求时，它不会将表单数据放入请求POST主体中，而是放入GET请求的URLSearchParams中。*/}
                    {/*    所以在输入搜索内容回车后url后会玉？q=xxx *!/*/}
                    {/*    <input*/}
                    {/*        id="q"*/}
                    {/*        aria-label="Search contacts"*/}
                    {/*        placeholder="Search"*/}
                    {/*        type="search"*/}
                    {/*        name="q"*/}
                    {/*    />*/}
                    {/*    <div*/}
                    {/*        id="search-spinner"*/}
                    {/*        aria-hidden*/}
                    {/*        hidden={true}*/}
                    {/*    />*/}
                    {/*    <div*/}
                    {/*        className="sr-only"*/}
                    {/*        aria-live="polite"*/}
                    {/*    ></div>*/}
                    {/*</form>*/}

                    {/*
                    defaultValue设置之前有两点坏处
                     1.输入查找内容回车后，刷新页面，虽然内容时查找出来的，但是所搜栏上没内容
                     2.输入查找内容回车后，浏览器返回上一页面，此时搜索栏上有内容，但是显示查找出来的是所有的内容--这个问题是用useEffect解决
                     onChange 不加这个属性时，回车进行查询，加上这个属性可以改变时直接搜索
                     */}
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                // 直接使用submit(event.currentTarget.form),会有一个现象：比如搜索ddd,此时在搜索栏删删除,那么每次变动都会进行一次搜索，包括d、dd、ddd
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div id="search-spinner" aria-hidden hidden={ !searching} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    {/*当我们点击侧边栏中的链接时，浏览器会对下一个URL进行完整的文档请求，而不是使用React Router。
客户端路由允许我们的应用程序更新URL，而不需要从服务器请求另一个文档。相反，应用程序可以立即呈现新的UI。让我们用<Link>实现它。*/}
                                    {/*<Link to={`contacts/${contact.id}`}>*/}
                                    {/*    {contact.first || contact.last ? (*/}
                                    {/*        <>*/}
                                    {/*            {contact.first} {contact.last}*/}
                                    {/*        </>*/}
                                    {/*    ) : (*/}
                                    {/*        <i>No Name</i>*/}
                                    {/*    )}{" "}*/}
                                    {/*    {contact.favorite && <span>★</span>}*/}
                                    {/*</Link>*/}
                                    {/*MavLink可以使我们更加清晰的知道自己在哪一层，高亮导航栏 */}
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            {/* useNavigation返回当前导航状态:它可以是“空闲”|“提交”|“加载”之一 */}
            <div
                id="detail"
                className={
                navigation.state === "loading" ? "loading" : ""
            }>
                {/* 路由中root下的子路由，都在次展示，其实就相当于一个占位符*/}
                <Outlet />
            </div>
        </>
    );
}