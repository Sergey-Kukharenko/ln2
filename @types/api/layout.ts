interface Main {
  slug: string;
  title: string;
}

interface Call {
  title: string;
  phone: string;
  whatsapp: string;
}

interface Phone {
  url: number;
  phone: string;
  text: string;
}

interface Contacts {
  title: string;
  phones: Phone[];
}

interface List {
  url: string;
  name: string;
}

interface Partners {
  title: string;
  list: List[];
}

interface About {
  title: string;
  list: List[];
}

interface Help {
  title: string;
  list: List[];
}

interface Sections {
  about: About;
  partners: Partners;
  help: Help;
}

export interface NavigationResponse {
  main: Main[];
  other: Record<string, Nullable<string>>[];
  call: Call;
}

export interface FooterResponse {
  mode: string;
  rights: string;
  email: string;
  contacts: Contacts;
  sections: Sections;
}
