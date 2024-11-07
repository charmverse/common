import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';

export const scoutGameUserProfileEASSchema = 'string id,string metadataUrl';

export const scoutGameUserProfileSchemaName = 'Scout Game User Profile';

export type ScoutGameUserProfileAttestation = {
  id: string;
  metadataUrl: string;
};

const encoder = new SchemaEncoder(scoutGameUserProfileEASSchema);

export function encodeScoutGameUserProfileAttestation(attestation: ScoutGameUserProfileAttestation): `0x${string}` {
  const encodedData = encoder.encodeData([
    { name: 'id', type: 'string', value: attestation.id },
    { name: 'metadataUrl', type: 'string', value: attestation.metadataUrl }
  ]);

  return encodedData as `0x${string}`;
}

export function decodeScoutGameUserProfileAttestation(rawData: string): ScoutGameUserProfileAttestation {
  const parsed = encoder.decodeData(rawData);
  const values = parsed.reduce((acc, item) => {
    const key = item.name as keyof ScoutGameUserProfileAttestation;

    acc[key] = item.value.value as string;

    return acc;
  }, {} as ScoutGameUserProfileAttestation);

  return values as ScoutGameUserProfileAttestation;
}
