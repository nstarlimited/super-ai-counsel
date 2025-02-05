export type ConsultationType = {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  is_emergency: boolean;
  is_group: boolean;
  max_participants: number | null;
};

export type ConsultationDocument = {
  id: string;
  consultation_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  uploaded_by: string;
  uploaded_at: string;
};

export type ConsultationQuestionnaire = {
  id: string;
  consultation_type_id: string;
  questions: {
    id: string;
    question: string;
    required: boolean;
    type: 'text' | 'choice' | 'multiple';
    options?: string[];
  }[];
  is_required: boolean;
};

export type ConsultationBookingData = {
  lawyer_id: string;
  consultation_type_id: string;
  scheduled_at: string;
  meeting_type: 'virtual' | 'in_person';
  case_brief?: string;
  special_requirements?: string;
  preferred_communication?: string;
};