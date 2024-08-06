export type PostType = {
    id: string
    title: string
    meta_title: string
    description: string
    meta_description: string
    content: string
    category: string
    author: string
    created_at: string
    status: string
    url: string
    featured_image: string
}

export type PostDataType = Omit<PostType, 'id' | 'created_at'>;

export type UserCredentialType = {
    email: string
    password: string
}

export type PostCategoryType = {
    id: string,
    created_at: string,
    name: string
    url: string
}
export type CategoryDataType = Omit<PostCategoryType, 'id' | 'created_at'>;

export type AuthorsType = {
    id: string,
    name: string,
    descrition: string,
    created_at: string,
    photo: string,
    whois: string
}

export type MediaType = {
    id: string
    name: string
    alt: string
    description: string
    caption: string
    created_at: string
    uploaded_to: string
}

export type MediaDataType = Omit<MediaType, 'id' | 'created_at'>