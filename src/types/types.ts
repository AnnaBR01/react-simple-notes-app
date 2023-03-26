export interface ITag {
  id: string;
  tagName: string;
}

export interface INote {
  id: string;
  noteName: string;
  noteDescription: string;
  noteTags: ITag[];
}
