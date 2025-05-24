export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
  email?: string;
  phone?: string;
  specialties?: string[];
}