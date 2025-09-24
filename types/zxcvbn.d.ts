declare module "zxcvbn" {
  export interface ZXCVBNResult {
    score: 0 | 1 | 2 | 3 | 4;
    feedback: {
      warning: string;
      suggestions: string[];
    };
    crack_times_display: {
      online_throttling_100_per_hour: string;
      online_no_throttling_10_per_second: string;
      offline_slow_hashing_1e4_per_second: string;
      offline_fast_hashing_1e10_per_second: string;
    };
    guesses_log10: number;
  }

  export default function zxcvbn(password: string): ZXCVBNResult;
}
