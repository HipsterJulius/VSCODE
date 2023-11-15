import { redirect } from "react-router-dom";
import { destroyTable} from "../tables";


export async function action({ params }: {params : any}) {
  await destroyTable(params.tableId);
  return redirect("/");
}
