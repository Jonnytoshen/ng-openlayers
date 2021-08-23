import { InjectionToken } from "@angular/core";
import { BaseLayerRef } from "./layer.abstract";

export const LAYER_PROVIDER = new InjectionToken<BaseLayerRef>('Layer Provider');
