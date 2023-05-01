import * as React from 'react';
import { IGetdataProps } from './IGetdataProps';
import { Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { DetailsList } from 'office-ui-fabric-react';
import { format } from 'date-fns';
import { IColumn } from 'office-ui-fabric-react';
import Getbutton from './button';
//import styles from './Getdata.module.scss';
export interface IGetDataStates {
  IStateItems: any
}
export default class Getdata extends React.Component<IGetdataProps, IGetDataStates> {
  constructor(props: IGetdataProps, state: IGetDataStates) {
    super(props);
    this.state = {
      IStateItems: []
    }
  }
  public async componentDidMount() {
    await this.FetchData();

  }
  // Getting List Data
  public async FetchData() {
    const data: any[] = [];
    let web = Web(this.props.SiteURL);
    const items: any[] = await web.lists.getByTitle("Demo_2").items.select("*", "Name/Title","Lookup/Title").expand("Name","Lookup").get();
    await items.forEach(async item => {
      const attachments = item.Attachments ? await web.lists.getByTitle("Demo_2").items.getById(item.Id).attachmentFiles.get() : null;
      await data.push({
        Title: item.Title,
        Name: item.Name.Title,
        JoiningDate: format(new Date(item.JoiningDate), "MMMM,d,yyyy"),
        Description: item.Description,
        WorkFrom: item.WorkFrom,
        Lookup:item.Lookup.Title,
        Currency:item.Currency?`$${item.Currency.toLocaleString()}` : '',
        Multiline: item.Multiline,
        Attachments: attachments ? attachments.map((attachment: any) => attachment.FileName).join(", ") : null,
        Imageslink:item.Imageslink,
      });

    });
    console.log(data);
    this.setState({ IStateItems: data });
  }
  public render(): React.ReactElement<IGetdataProps> {
    const columns: IColumn[] = [
      { key: "Title", name: "Salutation", fieldName: "Title", minWidth: 150 ,isResizable:true},
      { key: "Name", name: "Employee Name", fieldName: "Name", minWidth: 150 ,isResizable:true},
      { key: "JoiningDate", name: "Joining Date", fieldName: "JoiningDate", minWidth: 150 ,isResizable:true},
      { key: "Description", name: "Description", fieldName: "Description", minWidth: 150, isMultiline: true ,isResizable:true},
      { key: "WorkFrom", name: "Work Mode", fieldName: "WorkFrom", minWidth: 150,isResizable:true },
      { key: "Lookup", name: "Lookup", fieldName: "Lookup", minWidth: 150,isResizable:true },
      { key: "Currency", name: "Currency", fieldName: "Currency", minWidth: 150,isResizable:true },
      { key: "Multiline", name: "Multiline", fieldName: "Multiline", minWidth: 150,isResizable:true },
      { key: "Attachments", name: "Attachments", fieldName: "Attachments", minWidth: 150,isResizable:true },
      { key: "Imageslink", name: "Imageslink", fieldName: "Imageslink", minWidth: 150,isResizable:true }

    ]
    return (
      <>
        <DetailsList items={this.state.IStateItems}
                  columns={columns} 
/>
<br/>
<br/>
<Getbutton/>
<h1>Hello world</h1>
      </>
    );
  }
}
