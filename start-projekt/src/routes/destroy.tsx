import { redirect } from "react-router-dom";
import { destroyIndicator } from "../indicators";


export async function action({ params }: {params : any}) {
  await destroyIndicator(params.indicatorId);
  return redirect("/");
}
