import { Component, OnInit } from '@angular/core';
import ViewerOptions = Cesium.ViewerOptions;
import Viewer = Cesium.Viewer;
import Globe = Cesium.Globe;
import Scene = Cesium.Scene;
import GeometryInstance = Cesium.GeometryInstance;
import Primitive = Cesium.Primitive;
import PrimitiveCollection = Cesium.PrimitiveCollection;
import EllipsoidSurfaceAppearance = Cesium.EllipsoidSurfaceAppearance;
import Material = Cesium.Material;
import RectangleGeometry = Cesium.RectangleGeometry;
import Rectangle = Cesium.Rectangle;

@Component({
	selector: 'dynamic-water',
	templateUrl: './dynamic-water.component.html',
	styleUrls: ['./dynamic-water.component.scss']
})
export class DynamicWaterComponent implements OnInit {
	viewerOptions: ViewerOptions;
	viewer: Viewer;
	scene: Scene;
	globe: Globe;
	dynamicWaterCollection: PrimitiveCollection;

	constructor() {
	}

	ngOnInit() {
	}

	onViewerReady(evt: any) {
		this.viewer = evt.viewer;
		this.scene = evt.scene;
		this.globe = evt.globe;

		this.applyWaterMaterialWorld(this.scene);
	}

	applyWaterMaterial(geometryInstance: GeometryInstance, waterScene: Scene) {
		this.dynamicWaterCollection = waterScene.primitives.add(new Primitive({
			geometryInstances: geometryInstance,
			appearance: new EllipsoidSurfaceAppearance({
				aboveGround: false,
				material: new Material({
					fabric: {
						type: 'Water',
						uniforms: {
							specularMap: './assets/images/earthspec1k.jpg',
							normalMap: './assets/images/waterNormals.jpg',
							frequency: 10000.0,
							animationSpeed: 0.01,
							amplitude: 1.0
						}
					}
				})
			}),
			show: true
		}))
	}

	applyWaterMaterialWorld(waterScene: Scene) {
		this.dynamicWaterCollection = waterScene.primitives.add(new Primitive({
			geometryInstances: new GeometryInstance({
				geometry: new RectangleGeometry({
					rectangle: Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
					vertexFormat: EllipsoidSurfaceAppearance.VERTEX_FORMAT
				})
			}),
			appearance: new EllipsoidSurfaceAppearance({
				aboveGround: false,
				material: new Material({
					fabric: {
						type: 'Water',
						uniforms: {
							specularMap: './assets/images/earthspec1k.jpg',
							normalMap: './assets/images/waterNormals.jpg',
							frequency: 10000.0,
							animationSpeed: 0.01,
							amplitude: 1.0
						}
					}
				})
			}),
			show: true
		}))
	}

	removeWaterMaterial(waterScene: Scene) {
		if (this.dynamicWaterCollection) {
			waterScene.primitives.remove(this.dynamicWaterCollection)
		}
	}
}
