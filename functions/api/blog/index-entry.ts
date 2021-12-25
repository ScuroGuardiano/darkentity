export default interface IIndexEntry {
  [key: string]: any;
  key: string;
  title: string;
  date: string | Date;
  tags?: string[];
}
