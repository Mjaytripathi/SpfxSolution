import { PrimaryButton } from 'office-ui-fabric-react';
import styles from './Getdata.module.scss';
import * as React from 'react';
export default class Getbutton extends React.Component<{}>{
    public render(): React.ReactElement<{}> {
        return (
            <div>
                <PrimaryButton className={styles.GetButton}>Save Data</PrimaryButton>
            </div>
        )
    }
}
