interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Recommendations {
    seeds: Seed[],
    tracks: Track[];
}

interface Seed {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
}

interface Track {
    album: Album;
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalID;
    external_urls: ExternalURL;
    href: string;
    id: string;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean
}

interface Album {
    album_type: string;
    total_tracks: number;
    external_urls: ExternalURL;
    href: string;
    id: string;
    images: Image[]
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    album_group: string;
    artists: Artist[];
    is_playable: boolean
}
interface Artist {
    external_urls: ExternalURL
    href: string
    id: string
    name: string
    type: string
    uri: string
}

interface ExternalURL {
    spotify: string
}

interface ExternalID {
    isrc: string
}

interface Image {
    url: string;
    height: number;
    width: number;
}
