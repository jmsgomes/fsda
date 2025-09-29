import { AfterViewInit, Component, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

declare const L: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('client');
  private map: any;
  private manholes: any[] = [];
  private pipes: any[] = [];
  private manholeLayers: any[] = [];
  private pipeLayers: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.setupControls();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([38.7223, -9.1393], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.addSampleData();
  }

  private addSampleData(): void {
    this.manholes = [
      { id: 1, name: 'Manhole 1', lat: 38.723, lon: -9.139, depth: 3 },
      { id: 2, name: 'Manhole 2', lat: 38.724, lon: -9.141, depth: 3.5 },
      { id: 3, name: 'Manhole 3', lat: 38.722, lon: -9.142, depth: 2.8 }
    ];

    this.pipes = [
      { id: 1, start: [38.723, -9.139], end: [38.724, -9.141], material: 'PVC', diameter: 0.3 },
      { id: 2, start: [38.724, -9.141], end: [38.722, -9.142], material: 'Concrete', diameter: 0.5 }
    ];

    this.manholes.forEach(manhole => {
      const marker = L.marker([manhole.lat, manhole.lon]);
      marker.on('click', () => {
        this.updateSidebar(manhole);
      });
      this.manholeLayers.push(marker);
    });

    this.pipes.forEach(pipe => {
      const polyline = L.polyline([pipe.start, pipe.end], { color: 'blue' });
      polyline.on('click', () => {
        this.updateSidebar(pipe);
      });
      this.pipeLayers.push(polyline);
    });

    this.filterFeatures();
  }

  private setupControls(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    searchInput.addEventListener('input', () => this.filterFeatures());

    const filterCheckboxes = document.querySelectorAll('#filters input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.filterFeatures());
    });
  }

  private filterFeatures(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchTerm = searchInput.value.toLowerCase();

    const manholeCheckbox = document.querySelector('#filters input[value="manhole"]') as HTMLInputElement;
    const pipeCheckbox = document.querySelector('#filters input[value="pipe"]') as HTMLInputElement;

    this.manholeLayers.forEach(layer => this.map.removeLayer(layer));
    this.pipeLayers.forEach(layer => this.map.removeLayer(layer));

    if (manholeCheckbox.checked) {
      const filteredManholes = this.manholes.filter(manhole => manhole.name.toLowerCase().includes(searchTerm));
      filteredManholes.forEach(manhole => {
        const layer = this.manholeLayers[this.manholes.indexOf(manhole)];
        layer.addTo(this.map);
      });
    }

    if (pipeCheckbox.checked) {
      // Pipes don't have names, so we don't filter them by search term.
      // We could filter by material or other properties in a real application.
      this.pipeLayers.forEach(layer => layer.addTo(this.map));
    }
  }

  private updateSidebar(feature: any): void {
    const sidebarContent = document.getElementById('sidebar-content');
    if (sidebarContent) {
      let content = '';
      if (feature.depth) { // It's a manhole
        content = `
          <h3>${feature.name}</h3>
          <p><strong>ID:</strong> ${feature.id}</p>
          <p><strong>Depth:</strong> ${feature.depth}m</p>
        `;
      } else { // It's a pipe
        content = `
          <h3>Pipe ${feature.id}</h3>
          <p><strong>Material:</strong> ${feature.material}</p>
          <p><strong>Diameter:</strong> ${feature.diameter}m</p>
        `;
      }
      sidebarContent.innerHTML = content;
    }
  }
}
