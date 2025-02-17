
export interface VeiledereData {
	enhet: Enhet;
	veilederListe: Veileder[];
}

export interface Enhet {
	enhetId: string;
	navn: string;
}

export interface Veileder {
	fornavn: string;
	etternavn: string;
	navn: string;
	ident: string;
}
