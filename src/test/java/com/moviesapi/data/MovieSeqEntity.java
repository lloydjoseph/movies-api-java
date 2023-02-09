package com.moviesapi.data;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "movie_seq", schema = "movies", catalog = "")
public class MovieSeqEntity {
    @Basic
    @Column(name = "next_val")
    private Long nextVal;

    public Long getNextVal() {
        return nextVal;
    }

    public void setNextVal(Long nextVal) {
        this.nextVal = nextVal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovieSeqEntity that = (MovieSeqEntity) o;
        return Objects.equals(nextVal, that.nextVal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nextVal);
    }
}
