import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
    //顺便检验一下全局异常处理
    // throw new Error("oh dang!");
    // eslint-disable-next-line no-unreachable
    await deleteContact(params.contactId);
    return redirect("/");
}