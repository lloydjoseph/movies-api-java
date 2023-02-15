package com.moviesapi;

import com.moviesapi.db.MovieRepository;
import com.moviesapi.db.MovieEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:57172"})
@RequestMapping("/movies/api")
public class MoviesApiController {
    private final MovieRepository movieRepository;

    public MoviesApiController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @GetMapping("/view")
    public @ResponseBody Iterable<MovieEntity> view() {
        return this.movieRepository.findAllByOrderByRatingDesc();
    }

    @GetMapping("/view/{id}")
    public @ResponseBody MovieEntity viewById(@PathVariable int id) {
        return this.movieRepository.findById(id);
    }

    @PostMapping("/add")
    public @ResponseBody String add(@RequestParam String name, @RequestParam int rating) {
        MovieEntity movie = new MovieEntity();
        movie.setName(name);
        movie.setRating(rating);
        movieRepository.save(movie);

        return "Added movie to list";
    }

    @PutMapping("/update")
    public @ResponseBody String update(@RequestParam int id, @RequestParam String name, @RequestParam int rating) {
        MovieEntity movie = movieRepository.findById(id);

        movie.setName(name);
        movie.setRating(rating);
        movieRepository.save(movie);

        return "Updated movie from list";
    }

    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable int id) {
        MovieEntity movie = movieRepository.findById(id);

        movieRepository.delete(movie);

        return "Deleted movie from list";
    }
}