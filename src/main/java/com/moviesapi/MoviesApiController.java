package com.moviesapi;

import com.moviesapi.db.MovieRepository;
import com.moviesapi.db.MovieEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:57172", "http://141.136.36.71"})
@RequestMapping("/api/movies")
public class MoviesApiController {
    private final MovieRepository movieRepository;

    @Value("${api.key}")
    private final String apiKey;

    public MoviesApiController(MovieRepository movieRepository, String apiKey) {
        this.movieRepository = movieRepository;
        this.apiKey = apiKey;
    }

    @GetMapping("/view")
    public @ResponseBody Iterable<MovieEntity> view(@RequestHeader("Authorization") String apiKey)  {
        if(Objects.equals(apiKey, this.apiKey)) {
            return this.movieRepository.findAllByOrderByRatingDesc();
        }
        return null;
    }

    @GetMapping("/view/{id}")
    public @ResponseBody MovieEntity viewById(@PathVariable int id, @RequestHeader("Authorization") String apiKey) {
        if(Objects.equals(apiKey, this.apiKey)) {
            return this.movieRepository.findById(id);
        }
        return null;
    }

    @PostMapping("/add")
    public @ResponseBody String add(@RequestParam String name, @RequestParam int rating, @RequestHeader("Authorization") String apiKey) {
        if(Objects.equals(apiKey, this.apiKey)) {
            MovieEntity movie = new MovieEntity();
            movie.setName(name);
            movie.setRating(rating);
            movieRepository.save(movie);
            return "Added movie to list";
        }
        return null;
    }

    @PutMapping("/update")
    public @ResponseBody String update(@RequestParam int id, @RequestParam String name, @RequestParam int rating, @RequestHeader("Authorization") String apiKey) {
        if(Objects.equals(apiKey, this.apiKey)) {
            MovieEntity movie = movieRepository.findById(id);
            movie.setName(name);
            movie.setRating(rating);
            movieRepository.save(movie);
            return "Updated movie from list";
        }
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public @ResponseBody String delete(@PathVariable int id, @RequestHeader("Authorization") String apiKey) {
        if(Objects.equals(apiKey, this.apiKey)) {
            MovieEntity movie = movieRepository.findById(id);
            movieRepository.delete(movie);
            return "Deleted movie from list";
        }
        return null;
    }
}