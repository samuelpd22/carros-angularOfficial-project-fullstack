import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAcessoriosComponent } from './new-acessorios.component';

describe('NewAcessoriosComponent', () => {
  let component: NewAcessoriosComponent;
  let fixture: ComponentFixture<NewAcessoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAcessoriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAcessoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
