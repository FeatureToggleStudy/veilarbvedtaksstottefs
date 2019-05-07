import * as React from 'react';
import './opplysninger.less';
import { Checkbox } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { EgneOpplysninger } from './egneopplysninger';

export enum OpplysningType {
    BRUKERENS_CV = 'brukerens_cv',
    BRUKERENS_JOBBPROFIL = 'brukerens_jobbprofil',
    BRUKERENS_SVAR_VED_REGISTRERING = 'brukerens_svar_ved_registrering',
    BRUKERENS_EGENVURDERING = 'brukerens_egenvurdering',

}

interface OpplysningerProps {
    handleOpplysningerChanged: (e: any) => void;
}

function Opplysninger(props: OpplysningerProps) {
    const {handleOpplysningerChanged} = props;

    const opplysninger = [
        {
            label: 'Brukerens CV',
            name: OpplysningType.BRUKERENS_CV,
        },
        {
            label: 'Brukerens svar ved registrering hos NAV',
            value: OpplysningType.BRUKERENS_SVAR_VED_REGISTRERING,
        },
        {
            label: 'Brukerens jobbprofil på nav.no',
            name: OpplysningType.BRUKERENS_JOBBPROFIL,
        },
        {
            label: 'Brukerens egenvurdering',
            name: OpplysningType.BRUKERENS_EGENVURDERING,
        },
    ];

    const ForhandsdefinieradeOppplysninger = () => {
        return (
            <>
                {opplysninger.map((opplysning, index) =>
                    <Checkbox
                        key={index}
                        name={opplysning.name}
                        label={opplysning.label}
                        onChange={handleOpplysningerChanged}
                        className="inputPanel checkboksPanel"
                    />
                )}
            </>
        );
    };

    return (
        <SkjemaElement tittel="Opplysninger" className="opplysninger">
            <ForhandsdefinieradeOppplysninger/>
            <EgneOpplysninger/>
        </SkjemaElement>
    );
}

export default Opplysninger;
