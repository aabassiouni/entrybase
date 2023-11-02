export type DBResult = {
	timestep: string;
	signups_count: number;
};

export type DBCounts = {
	total_signups: number;
	invited_signups: number;
};

export type Counts = {
	total: number;
	invited: number;
	waiting: number;
};

export type Entry = {
	label: string;
	value: number;
	tooltipLabel: string;
};

export type EmailTemplateProps = {
	email: string;
	bodyText: string;
	headerSectionColor: string;
};
