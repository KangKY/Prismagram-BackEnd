export const USER_FRAGMENT = `
        id
        username
`

export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            username
        }
    }
`

export const ROOM_FRAGMENT = `
    fragment ChatParts on Chat {
        id
        participants {
            ${USER_FRAGMENT}
        }
    }
`;