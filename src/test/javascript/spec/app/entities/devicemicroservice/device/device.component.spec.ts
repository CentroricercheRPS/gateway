import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DeviceComponent } from 'app/entities/devicemicroservice/device/device.component';
import { DeviceService } from 'app/entities/devicemicroservice/device/device.service';
import { Device } from 'app/shared/model/devicemicroservice/device.model';

describe('Component Tests', () => {
  describe('Device Management Component', () => {
    let comp: DeviceComponent;
    let fixture: ComponentFixture<DeviceComponent>;
    let service: DeviceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DeviceComponent]
      })
        .overrideTemplate(DeviceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeviceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeviceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Device(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.devices && comp.devices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
