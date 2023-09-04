import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any = [];
  imageBaseUrl = environment.images;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { } //ActivatedRoute is to get the id from the route (movies/12345)

  ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id!).subscribe(result=>{
      console.log(result);
      this.movie= result;
    })
  }

}
