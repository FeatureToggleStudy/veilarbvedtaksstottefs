import React from 'react';
import { InnatsgruppeVisning as Visning, InnsatsgruppeType } from '../skjema/innsatsgruppe/innsatsgruppe';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';

export function InnsatsgruppeVisning(props: {innsatsgruppe: InnsatsgruppeType, beslutter?: string}) {
    return (
        <SkjemaBolk
            tittel="Innsatsgruppe"
            tittelId="innsatsgruppe-tittel"
        >
            <div className="innsatsgruppe-visning">
                <Visning innsatsgruppe={props.innsatsgruppe}/>
                {props.beslutter && <span><b>Beslutter: </b> {props.beslutter}</span>}
            </div>
        </SkjemaBolk>
    );
}
