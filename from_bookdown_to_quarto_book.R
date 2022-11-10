# Nicholas Tierney, "Notes on Changing from Rmarkdown/Bookdown to Quarto"
# https://www.njtierney.com/post/2022/04/11/rmd-to-qmd/

# 1. change filenames: filename.Rmd —> filename.qmd -----
library(fs)
library(stringr)
rmd_names <- dir_ls(path = ".", glob = "*.Rmd")
qmd_names <- str_replace(string = rmd_names,
                         pattern = "Rmd",
                         replacement = "qmd")
file_move(path = rmd_names,
          new_path = qmd_names)

file_move(path = "_bookdown.yml",
          new_path = "_quarto.yml")

# 2. Change _bookdown.yml to _quarto.yml and remove _output.yml ----

library(readr)
library(stringr)
quarto_yaml_rmd <- read_lines("_quarto.yml")

quarto_yaml_qmd <- str_replace_all(string = quarto_yaml_rmd,
                                   pattern = "Rmd",
                                   replacement = "qmd")

write_lines(
  x = quarto_yaml_qmd,
  file = "_quarto.yml"
)
