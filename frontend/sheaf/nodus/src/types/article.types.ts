export default interface IAllArticlesData {
    id?: any | null,
    title: string,
    summary:string,
    metaTitle: string |null,
    authorId: number | null,
    slug: string,
    description: string | null,
    published?: boolean,
    sections: any
    
}