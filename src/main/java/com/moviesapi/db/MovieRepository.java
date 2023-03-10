package com.moviesapi.db;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface MovieRepository extends CrudRepository<MovieEntity, Integer> {
    MovieEntity findById(int id);
    List<MovieEntity> findAllByOrderByRatingDesc();
}