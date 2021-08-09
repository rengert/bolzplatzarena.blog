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
    const delay = 150;
    const types: OscillatorType[] = ['sine', 'sawtooth', 'square', 'triangle'];
    const data1 = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
    const data2 = 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.';
    const data3 = 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.';
    const data4 = 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.';
    const data5 = 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.';

    const promises = [data1, data2, data3, data4].map(
      (data, index) => new Promise<void>(async(resolve) => {
        setTimeout(() => {
          this.playStringsAsSound(data.split(' '), types[index], index);
          resolve();
        }, index * delay);
      }),
    );

    await Promise.all(promises);
  }

  async playStringsAsSound(data: string [], type: OscillatorType, index: number): Promise<void> {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();

    for (const term of data) {
      gain.gain.exponentialRampToValueAtTime(1, context.currentTime);
      let frequency = 0;
      for (let i = 0; i < term.length; i++) {
        frequency += 2 * term.charCodeAt(i);
      }
      console.log(index, term, frequency);
      try {
        oscillator.frequency.value = frequency;
        gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2.45);
      } catch {
      }

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2600);
      });
    }
  }
}
