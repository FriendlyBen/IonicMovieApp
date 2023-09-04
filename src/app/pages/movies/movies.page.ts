import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies : any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images

  constructor(private movieService: MovieService, private loadingController: LoadingController ) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingController.create({
      message: "Loading ...",
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(result=>{
      loading.dismiss();
      this.movies.push(...result.results);
      console.log(result);
      //with interface I can access the properties of result
      console.log(result.total_result);

      event?.target.complete();

      if(event){
        event.target.disabled = result.total_pages ===this.currentPage;
      }
    })
  }

  loadMore(event: Event) {
    const infiniteScrollEvent = event as InfiniteScrollCustomEvent;
    this.currentPage++;
    this.loadMovies(infiniteScrollEvent);
  }
  


}
