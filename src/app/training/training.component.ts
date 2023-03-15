import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Training } from '../models/training.interface';
import { TrainingsService } from '../services';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  training$: Observable<Training>;
  trainingId: number = 0;
  role: string = '';
  constructor(
    private route: ActivatedRoute, private trainingSvg: TrainingsService
  ) {}

  ngOnInit(): void {
    this.trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.training$ = this.trainingSvg.getTrainingById(this.trainingId);
    this.role = localStorage.getItem('role') as string;
  }

  getImage(trainingName: string): string{
    if(trainingName.includes('Angular'))
    return 'https://www.freecodecamp.org/news/content/images/size/w2000/2020/04/Copy-of-Copy-of-Travel-Photography-1.png';
    else if(trainingName.includes('.NET')) 
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/1200px-Microsoft_.NET_logo.svg.png';
    else if(trainingName.includes('React')) 
    return 'https://itsg-global.com/wp-content/uploads/2016/09/react-js-to-use-or-not-to-use.png';
    else if(trainingName.includes('Java')) 
    return 'https://www.developer.com/wp-content/uploads/2021/09/Java-tutorials.jpg';
    else return 'https://miro.medium.com/max/800/1*M_GDn6RXZSZC66kvrMHh5Q.png';
  }
}
