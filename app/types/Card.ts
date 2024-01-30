export interface Card {
  id: string;
  address?: string;
  badges?: {
    attachmentsByType: {
      trello: {
        board: number;
        card: number;
      };
    };
    location?: boolean;
    votes?: number;
    viewingMemberVoted?: boolean;
    subscribed?: boolean;
    fogbugz?: string;
    checkItems?: 0;
    checkItemsChecked?: 0;
    comments?: 0;
    attachments?: 0;
    description: boolean;
    due: string;
    start: string;
    dueComplete: boolean;
  };
  checkItemStates?: string[];
  closed?: boolean;
  coordinates?: string;
  creationMethod?: string;
  dateLastActivity?: string;
  desc: string;
  descData?: {
    emoji?: {};
  };
  due?: string;
  dueReminder?: string;
  email?: string;
  idBoard: string;
  idChecklists?: [
    {
      id: string;
    }
  ];
  idLabels?: [
    {
      id: string;
      idBoard: string;
      name: string;
      color: string;
    }
  ];
  idList: string;
  idMembers?: string[];
  idMembersVoted?: string[];
  idShort: number;
  labels?: string[];
  limits?: {
    attachments: {
      perBoard: {
        status: string;
        disableAt: number;
        warnAt: number;
      };
    };
  };
  locationName?: string;
  manualCoverAttachment?: boolean;
  name: string;
  pos?: number;
  shortLink: string;
  shortUrl: string;
  subscribed?: boolean;
  url: string;
  cover: Cover;
}

interface Cover {
  color?: string;
  idAttachment?: string;
  idUploadedBackground?: boolean;
  size?: string;
  brightness?: string;
  isTemplate?: boolean;
  url?: string;
}

export interface CardCover {
  bytes: number;
  date: string;
  edgeColor: string;
  fileName: string;
  id: string;
  idMember: string;
  isUpload: boolean;
  mimeType: string;
  name: string;
  pos: number;
  previews: Preview[];
  url: string;
}

export interface Preview {
  bytes: number;
  height: number;
  id: string;
  scaled: boolean;
  url: string;
  width: number;
  _id: string;
}
