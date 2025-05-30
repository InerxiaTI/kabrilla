export interface ContainerDto {
  name: string;
  image: string;
}

export interface PodResponseDto {
  name: string;
  status: string;
  containers: ContainerDto[];
}
  