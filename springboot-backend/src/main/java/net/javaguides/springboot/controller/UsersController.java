package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Users;
import net.javaguides.springboot.repository.UsersRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UsersController {

	@Autowired
	private UsersRepository usersRepository;
	
	@GetMapping("/users")
	public List<Users> getAllUsers() {
		return usersRepository.findAll();
	}
	
	@PostMapping("/users")
	public Users createUsers(@RequestBody Users users) {
		return usersRepository.save(users);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable Long id) {
		Users users = usersRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(users);
	}
	
	@PutMapping("/users/{id}")
	public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users usersDetails) {
		Users user = usersRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuário com id: " + id + " não existe!"));
		
		user.setName(usersDetails.getName());
		user.setPassword(usersDetails.getPassword());
		user.setEmail(usersDetails.getEmail());
		
		Users updatedUsers = usersRepository.save(user);
		return ResponseEntity.ok(updatedUsers);
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
		Users users = usersRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuário com id: " + id + " não existe!"));
		
		usersRepository.delete(users);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
