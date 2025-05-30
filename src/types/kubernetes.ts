export interface ContainerDto {
  name: string;
  image: string;
}

export interface PodResponseDto {
  name: string;
  status: string;
  containers: ContainerDto[];
}

export interface AwsCredentials {
  accessKey: string;
  secretKey: string;
  sessionToken: string;
}

  