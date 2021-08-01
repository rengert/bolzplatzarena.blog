import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoundComponent {
  constructor() {
  }

  async playSound(): Promise<void> {
    const data1 = ['ELT 1', 'MAL 2', 'MAL 6', 'TRO 2', 'DUS 2', 'XAR 2', 'TRO 1'];
    const data2 = ['FAL 1', 'ELT 1', 'MAL 2', 'MAL 6', 'TRO 2', 'DUS 2', 'XAR 2', 'TRO 1'];
    const data3 = ['MAL 6', 'TRO 2', 'DUS 2', 'XAR 2', 'TRO 1', 'ELT 1', 'MAL 2'];
    const data4 = ['PUH 1', 'ELT 1', 'MAL 2', 'MAL 6', 'TRO 2', 'DUS 2', 'XAR 2', 'TRO 1'];

    await Promise.all([
      new Promise<void>(async(resolve) => {
        setTimeout(() => {
          this.playStringsAsSound(data1);
          resolve();
        }, 100);
      }),
      new Promise<void>(async(resolve) => {
        setTimeout(() => {
          this.playStringsAsSound(data2);
          resolve();
        }, 300);
      }),
      new Promise<void>(async(resolve) => {
        setTimeout(() => {
          this.playStringsAsSound(data3);
          resolve();
        }, 500);
      }),
      new Promise<void>(async(resolve) => {
        setTimeout(() => {
          this.playStringsAsSound(data4);
          resolve();
        }, 700);
      }),
    ]);
  }

  async playStringsAsSound(data: string []): Promise<void> {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();

    for (const term of data) {
      let frequency = 0;
      for (let i = 0; i < term.length; i++) {
        frequency += term.charCodeAt(i);
      }
      console.log(term, frequency);
      try {
        oscillator.frequency.value = frequency;
      } catch {
      }

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    }
    gain.gain.exponentialRampToValueAtTime(
      0.00001, context.currentTime + 2.5,
    );
  }
}
