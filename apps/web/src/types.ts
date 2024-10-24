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
  day: string;
  signups: number;
};

export type EmailTemplateProps = {
  header: string | null;
  bodyText: string | null;
  companyWebsite: string | null;
  logoURL: string | null;
};

export type EntryResponse = { entries: Entry[]; dayString: string };

export type SearchParams = { [key: string]: string | string[] | undefined };
