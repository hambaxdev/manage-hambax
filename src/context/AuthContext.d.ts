import { ReactNode } from 'react';

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  organizationName?: string;
  organizationDescription?: string;
  address?: {
    country?: string;
    city?: string;
    zipCode?: string;
    streetName?: string;
    houseNumber?: string;
    state?: string;
  };
  contactInfo?: {
    phone?: string;
    alternatePhone?: string;
    website?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isBasicRegistrationComplete: boolean;
  userRole: string | null;
  setIsBasicRegistrationComplete: (value: boolean) => void;
  profileData: ProfileData | null;
  login: (accessToken: string, refreshToken: string, basicComplete: boolean) => void;
  logout: () => void;
  showRestrictionModal: (message: string) => void;
  updateUserProfile: (data: Partial<ProfileData>) => Promise<boolean>;
  profileError: any;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

declare const AuthContext: React.Context<AuthContextType>;
export default function AuthProvider({ children }: AuthProviderProps): JSX.Element;