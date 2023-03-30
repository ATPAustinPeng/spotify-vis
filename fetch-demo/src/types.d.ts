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
    available_markets: string[]
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {
    };
    restrictions: {
        reason: string;
    }
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
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[]
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
        reason: string;
    }
    type: string;
    uri: string;
    copyrights: Copyright[]
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    genres: string[];
    label: string;
    popularity: number;
    album_group: string;
    artists: Artist[];
}
interface Artist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
interface Image {
    url: string;
    height: number;
    width: number;
}

interface Copyright {
    text: string;
    type: string;
}
