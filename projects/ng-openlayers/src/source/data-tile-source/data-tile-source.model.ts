export type DataTileSourceLoader = {
  (x: number, y: number, z: number): Promise<Uint8Array | Uint8ClampedArray | Float32Array | DataView>;
}
