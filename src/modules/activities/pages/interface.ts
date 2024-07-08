interface Address {
    latitude: number;
    longitude: number;
    address: string;
  }
  
  interface BasicCity {
    id: number;
    country_id: number;
  }
  
  interface CategoryIds {
    parent_category: number;
    sub_category: number | null;
    sub_sub_category: number | null;
  }
  
  interface OpenTime {
    // Define properties for open times if needed
  }
  
  interface ThirdParty {
    id: number;
    name: string;
  }
  
  export type Data = {
    address: Address;
    basic_city: BasicCity;
    category_ids: CategoryIds;
    course_bundles: null; // Change to appropriate type if needed
    created_at: string;
    description: string;
    discount: null; // Change to appropriate type if needed
    email: string;
    fax: string;
    features: string[]; // Array of string features
    hold_on: string;
    id: number;
    include_in_adrenaline_rush: boolean;
    include_in_carousel: boolean;
    main_image: string;
    name: string;
    open_times: OpenTime[]; // Array of OpenTime objects
    other_images: string[]; // Array of other image URLs
    phone: string;
    price: number;
    rating_average: number;
    social_links: string[]; // Array of social links
    status: string;
    third_party: ThirdParty;
    type: string;
    website: string;
  }
  
  // Example usage:
 
  