import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from '../../models/config';
import { Level } from '../../models/level.enum';
import { Size } from '../../models/size.enum';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  readonly form = new FormGroup({
    level: new FormControl<Level>(Level.easy, Validators.required),
    size: new FormControl<Size>(Size.small, Validators.required),
  });
  readonly levels: Level[] = [Level.easy, Level.medium, Level.heavy];
  readonly sizes: Size[] = [Size.small, Size.medium, Size.large];

  constructor(
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {
  }

  save(): void {
    const config = this.form.getRawValue() as Config;
    this.storage.saveConfig(config);
    void this.router.navigate(['../nonogramm']);
  }

  ngOnInit(): void {
    const config = this.storage.loadConfig();
    this.form.patchValue(config);
  }
}
