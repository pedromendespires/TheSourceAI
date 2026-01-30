
export interface ManifestItem {
  id: string;
  text: string;
}

export interface ManifestationState {
  intentions: ManifestItem[];
  emotions: ManifestItem[];
  potentialSymbol: string;
}

export interface QuantumInsight {
  title: string;
  description: string;
  alignmentScore: number;
}
