import * as React from 'react';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import './innsatsgruppe.less';
import { OrNothing } from '../../../utils/types/ornothing';
import { EMDASH, SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { utkastetSkalKvalitetssikrets } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { Element, Normaltekst } from 'nav-frontend-typografi';

export enum InnsatsgruppeType {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
    GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
    VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export const getInnsatsgruppeNavn = (innsatsgruppeType: OrNothing<InnsatsgruppeType>) => {
    const innsatsgruppe = innsatsgrupper.find(elem => elem.value === innsatsgruppeType);
    return innsatsgruppe && innsatsgruppe.tittel;
};

interface InnsatsgruppeData {
    tittel: string;
    undertekst: string;
    value: InnsatsgruppeType;
}

export const innsatsgrupper: InnsatsgruppeData[] = [
    {
        tittel: 'Gode muligheter',
        undertekst: 'STANDARD INNSATS',
        value: InnsatsgruppeType.STANDARD_INNSATS
    },
    {
        tittel: 'Trenger veiledning',
        undertekst: 'SITUASJONSBESTEMT INNSATS',
        value: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS,
    },
    {
        tittel: 'Trenger veiledning, nedsatt arbeidsevne',
        undertekst: 'SPESIELT TILPASSET INNSATS',
        value: InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS,
    },
    {
        tittel: 'Delvis varig nedsatt arbeidsevne',
        undertekst: 'DELVIS VARIG TILPASSET INNSATS',
        value: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
    },
    {
        tittel: 'Liten mulighet til å jobbe',
        undertekst: 'VARIG TILPASSET INNSATS',
        value: InnsatsgruppeType.VARIG_TILPASSET_INNSATS
    },
];

interface InnsatsgruppeProps {
    innsatgruppefeil?: string;
}

function Innsatsgruppe (props: InnsatsgruppeProps) {
    const {innsatsgruppe, setInnsatsgruppe} = useContext(SkjemaContext);
    const {setHovedmal} = useContext(SkjemaContext);
    const kvalitetssikresVarsel = utkastetSkalKvalitetssikrets(innsatsgruppe);
    return (
        <SkjemaBolk
            tittel="Innsatsgruppe"
            tittelId="innsatsgruppe-tittel"
        >
            {kvalitetssikresVarsel &&
            <AlertStripeAdvarsel className="innsatsgruppe-advarsel">
                <span className="innsatsgruppe-advarsel__tekst">
                Ved <i>delvis varig tilpasset innsats</i> og <i>varig tilpasset innsats</i> må arbeidsevnevurderingen godkjennes av beslutter etter gjeldende rutine.
                </span>
            </AlertStripeAdvarsel>
            }
            <SkjemaGruppe feil={props.innsatgruppefeil ? {feilmelding : props.innsatgruppefeil} : undefined}>
                <InnsatsgruppeRadioButtons
                    handleInnsatsgruppeChanged={setInnsatsgruppe}
                    innsatsgruppe={innsatsgruppe}
                    setHovedmal={setHovedmal}
                />
            </SkjemaGruppe>
        </SkjemaBolk>
    );
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
    handleInnsatsgruppeChanged: (e: any) => void;
    setHovedmal: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function InnsatsgruppeRadioButtons (props: InnsatsgruppeRadioProps ) {
    return (
        <div className="innsatsgruppe" aria-labelledby="innsatsgruppe-tittel">
            {innsatsgrupper.map((innsatsgruppeObject, index) =>
                <RadioPanel
                    key={index}
                    label={<InnatsgruppeVisning className="innsatsgruppe__label" innsatsgruppe={innsatsgruppeObject.value}/>}
                    value={innsatsgruppeObject.value}
                    name="innsatsgruppe"
                    onChange={(e: any) => {
                        const innsatsgruppe = e.target.value;
                        props.handleInnsatsgruppeChanged(innsatsgruppe);
                        if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
                            props.setHovedmal(null);
                        }
                    }}
                    checked={props.innsatsgruppe === innsatsgruppeObject.value}
                />
            )}
        </div>
    );
}

export function InnatsgruppeVisning({ innsatsgruppe, className }: { innsatsgruppe: InnsatsgruppeType, className?: string }) {
    const innsatsgruppeData = innsatsgrupper.find(elem => elem.value === innsatsgruppe);

    if (!innsatsgruppeData) {
        return EMDASH as any;
    }

    return (
        <div className={className}>
            <Element>{innsatsgruppeData.tittel}</Element>
            <Normaltekst className="innsatsgruppe__label--undertekst">{innsatsgruppeData.undertekst}</Normaltekst>
        </div>
    );
}
