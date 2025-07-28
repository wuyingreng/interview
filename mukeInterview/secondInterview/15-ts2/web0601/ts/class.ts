type TGender = 'male' | 'female';

interface Person {
  name: string;
  gender: TGender;
  birthday?: Date;
  log: () => void;
}
// 两个地方都要重复的写
class CPerson implements Person {
  name: string;
  gender: TGender;
  birthday?: Date;
  constructor(name: string, gender: TGender) {
    this.name = name;
    this.gender = gender;
  }
  log() {
    console.log('name', this.name, 'gender', this.gender)
  }
}