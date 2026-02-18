export interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface WorkflowSectionData {
  isActive?: boolean;
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  steps: WorkflowStep[];
  type?: string;
}
