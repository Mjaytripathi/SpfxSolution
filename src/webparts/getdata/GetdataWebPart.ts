import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GetdataWebPartStrings';
import Getdata from './components/Getdata';
import { IGetdataProps } from './components/IGetdataProps';

export interface IGetdataWebPartProps {
  description: string;
}

export default class GetdataWebPart extends BaseClientSideWebPart<IGetdataWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGetdataProps> = React.createElement(
      Getdata,
      {
        description: this.properties.description,
        context: this.context,
        SiteURL: this.context.pageContext.web.absoluteUrl

      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
